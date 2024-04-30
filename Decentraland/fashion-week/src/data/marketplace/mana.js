const MAXIMUM_FRACTION_DIGITS = 2;
/**
 * Format wei to a supported unit ('ether' by default) and localizes it with the desired fraction digits (2 by default)
 */
export function formatWeiMANA(
    wei,
    maximumFractionDigits = MAXIMUM_FRACTION_DIGITS
) {
    const value = Math.round(wei / Math.pow(10, 18));//Number(ethers.utils.formatEther(wei))

    if (value === 0) {
        return '0'
    }

    const fixedValue = value.toLocaleString(undefined, {
        maximumFractionDigits
    })

    if (fixedValue === '0') {
        return getMinimumValueForFractionDigits(maximumFractionDigits).toString()
    }

    return fixedValue
}

/**
 * Takes a string representing an ether MANA value and converts it to a two-place decimal number.
 * If the mana value is either negative or invalid, it'll return 0
 */
export function parseMANANumber(
    strMana,
    maximumFractionDigits = MAXIMUM_FRACTION_DIGITS
){
    const mana = parseFloat(strMana)

    if (strMana.length === 0 || isNaN(Number(strMana)) || mana < 0) {
        return 0
    }

    const fixedValue = parseFloat(mana.toFixed(maximumFractionDigits))

    if (fixedValue === 0) {
        return getMinimumValueForFractionDigits(maximumFractionDigits)
    }

    return fixedValue
}

/**
 * returns the minimum value that can be given the maximum fraction digits
 */
export function getMinimumValueForFractionDigits(
    maximumFractionDigits
) {
    return Math.pow(10, -maximumFractionDigits)
}
