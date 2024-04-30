import {
  CategoryIconProps,
  CategoryIconVariant,
  getCategoryIconPrimaryColor,
  getCategoryIconSecondaryColor,
} from '../../../helpers/styles'

function InWorldContent({ variant = CategoryIconVariant.Normal, size }: CategoryIconProps) {
  if (variant === CategoryIconVariant.Circled) {
    return (
      <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#F9D6DC" />
        <circle cx="9.61322" cy="8.61297" r="3.40033" fill="#D80027" />
        <path
          d="M14.4233 4.13737C14.2401 3.95421 13.9432 3.95421 13.76 4.13737L12.7651 5.13229C12.5819 5.31545 12.5819 5.61241 12.7651 5.79557L13.2142 6.24469C13.24 6.2705 13.2629 6.29926 13.2816 6.33058C14.2793 7.99699 14.0602 10.1887 12.6245 11.6244C11.1887 13.0603 8.99677 13.2792 7.33032 12.2814C7.29902 12.2626 7.27027 12.2398 7.24447 12.214L6.79557 11.7651C6.61242 11.5819 6.31545 11.5819 6.13229 11.7651L5.13737 12.76C4.95421 12.9432 4.95421 13.2401 5.13737 13.4233L5.30319 13.5891C5.48635 13.7723 5.78331 13.7723 5.96647 13.5891L6.17227 13.3833C6.33191 13.2237 6.58176 13.2025 6.77663 13.3165C7.54497 13.766 8.39881 14.0137 9.26141 14.0597V14.8275H6.91635C6.65732 14.8275 6.44734 15.0375 6.44734 15.2965V15.531C6.44734 15.79 6.65732 16 6.91635 16H12.779C13.038 16 13.248 15.79 13.248 15.531V15.2965C13.248 15.0375 13.038 14.8275 12.779 14.8275H10.4339V13.9978C11.5395 13.8205 12.6014 13.3058 13.4536 12.4535C15.2637 10.6434 15.5514 7.88734 14.3166 5.77656C14.2026 5.5817 14.2237 5.33185 14.3834 5.17221L14.5891 4.96647C14.7723 4.78331 14.7723 4.48635 14.5891 4.30318L14.4233 4.13737Z"
          fill="#D80027"
        />
      </svg>
    )
  }

  const primaryColor = getCategoryIconPrimaryColor('red', variant)
  const secondaryColor = getCategoryIconSecondaryColor('red', variant)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} fill="none" viewBox="-5 0 52 52">
      <circle cx="19.672" cy="19.672" r="14.5" fill={secondaryColor}></circle>
      <path
        fill={primaryColor}
        d="M40.184.586a2 2 0 00-2.829 0l-4.242 4.242a2 2 0 000 2.829l1.915 1.915c.11.11.207.233.287.366 4.255 7.106 3.32 16.452-2.802 22.575-6.123 6.123-15.47 7.056-22.576 2.801a1.9 1.9 0 01-.366-.287l-1.914-1.914a2 2 0 00-2.829 0L.586 37.355a2 2 0 000 2.829l.707.707a2 2 0 002.828 0L5 40.013c.68-.68 1.746-.77 2.577-.285a23.45 23.45 0 0010.596 3.17v3.274h-10a2 2 0 00-2 2v1a2 2 0 002 2h25a2 2 0 002-2v-1a2 2 0 00-2-2h-10v-3.538a23.393 23.393 0 0012.877-6.586c7.718-7.719 8.945-19.471 3.68-28.472-.487-.831-.396-1.897.285-2.577l.877-.878a2 2 0 000-2.828l-.707-.707z"
      ></path>
    </svg>
  )
}

export default InWorldContent
