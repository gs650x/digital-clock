export function getMonthNameFromIndex(index) {

    let monthsArray = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]
    return monthsArray[index];
}

export function getDayNameFromIndex(index) {

    let daysArray = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
    return daysArray[index];
}

export function getClockData(clockDigitColor, clockBackgroundcolor) {

    const CLOCK_DIGIT_COLOR = clockDigitColor;
    const CLOCK_BACKGROUND_COLOR = clockBackgroundcolor;

    return {
        0: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        1: {
            topHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`
        },
        2: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        3: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        4: {
            topHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`
        },
        5: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        6: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        7: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_BACKGROUND_COLOR}`
        },
        8: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
        9: {
            topHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            topLeftVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            topRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            centerHorizontal: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomLeftVertical: `background: ${CLOCK_BACKGROUND_COLOR}`,
            bottomRightVertical: `background: ${CLOCK_DIGIT_COLOR}`,
            bottomHorizontal: `background: ${CLOCK_DIGIT_COLOR}`
        },
    }
}