export type TemplateContent = {
  Body: {
    Html: {
      Charset: string
      Data: string
    }
    Text: {
      Charset: string
      Data: string
    }
  }
  Subject: {
    Charset: string
    Data: string
  }
}

export type TemplateProps = {
  name?: string
  subject?: string
  text?: string
}

export type Template = {
  TemplateName: string
  SubjectPart: string
  HtmlPart: string
  TextPart: string
}

export type TemplateAttributes<
  T extends string = string,
  R extends Record<string, string> = Record<string, string>
> = {
  template: T
  defaultReplacement?: R
}

export type Destination<
  R extends Record<string, string> = Record<string, string>
> = {
  email: string
  replacement?: R
}
