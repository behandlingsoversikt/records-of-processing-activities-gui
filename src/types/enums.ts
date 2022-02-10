export enum RecordStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED'
}

export enum DatasetStatus {
  DRAFT = 'DRAFT',
  APPROVE = 'APPROVE',
  PUBLISH = 'PUBLISH'
}

export enum RepresentativeType {
  DATA_PROTECTION_OFFICER = 'dataProtectionOfficer',
  DATA_CONTROLLER_REPRESENTATIVE = 'dataControllerRepresentative',
  DATA_CONTROLLER_REPRESENTATIVE_IN_EU = 'dataControllerRepresentativeInEU'
}

export enum SortOrder {
  ASC,
  DSC
}

export enum SortField {
  TITLE,
  STATUS,
  CONTACT
}

export enum KeyCode {
  TAB = 9,
  ENTER = 13,
  SPACE = 32,
  ARROW_UP = 38,
  ARROW_DOWN = 40
}

export enum ArticleNineCode {
  A = '9.2.a',
  B = '9.2.b',
  C = '9.2.c',
  D = '9.2.d',
  E = '9.2.e',
  F = '9.2.f',
  G = '9.2.g',
  H = '9.2.h',
  I = '9.2.i',
  J = '9.2.j'
}
