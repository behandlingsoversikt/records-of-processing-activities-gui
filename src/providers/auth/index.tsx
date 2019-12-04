import React, { ComponentType, createContext, PureComponent } from 'react';

import AuthService, { AuthServiceInteface } from '../../services/auth';

const AuthContext = createContext<any>(null);

interface Props {}

interface State {
  service: AuthServiceInteface;
  instantiated: boolean;
  userLoaded: boolean;
}

class AuthProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      service: AuthService,
      instantiated: false,
      userLoaded: false
    };
  }

  public async componentDidMount(): Promise<void> {
    const { service, userLoaded } = this.state;
    const authenticated: boolean = await service.init();
    this.setState({ instantiated: true });
    if (!authenticated && !userLoaded) {
      service.onUserLoad(() => this.setState({ userLoaded: true }));
    }
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const { instantiated } = this.state;
    return instantiated ? (
      <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>
    ) : (
      <></>
    );
  }
}

export function withAuth(Child: ComponentType<any>): ComponentType<any> {
  return (props: any) => (
    <AuthContext.Consumer>
      {({ service }) =>
        service ? (
          <Child {...props} authService={service} />
        ) : (
          <Child {...props} />
        )
      }
    </AuthContext.Consumer>
  );
}

export default AuthProvider;
