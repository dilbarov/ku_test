import { CONTROL_NUMBERS, INN_DIGITS_LENGTH } from "./constants/constants";

type ControlSumType = "UL_N1" | "FL_N1" | "FL_N2";

enum StartPositionType {
    "UL_N1" = 2,
    "FL_N1" = 1,
    "FL_N2" = 0,
}

export const getFirstControlNumberForInn = (inn: string): string => {
    return inn.length === INN_DIGITS_LENGTH.entity
        ? inn[INN_DIGITS_LENGTH.entity - 1]
        : inn[INN_DIGITS_LENGTH.individual - 2];
};

export const getSecondControlNumberForInn = (inn: string): string => {
    if (inn.length !== INN_DIGITS_LENGTH.individual) {
        throw new Error(
            `Количество символов ИНН физического лица несоотвествует: ожидается ${INN_DIGITS_LENGTH.individual}`
        );
    }
    return inn[INN_DIGITS_LENGTH.individual - 1];
};

export const getCurrentControlNumber = (inn: string, controlSumType: ControlSumType): string => {
    if (controlSumType === "UL_N1" || controlSumType === "FL_N1") {
        return getFirstControlNumberForInn(inn);
    }
    return getSecondControlNumberForInn(inn);
};

export const checkExpressionForNumber = (expression: string): boolean => {
    return /^(?!00)\d+$/.test(expression);
};

export const validateInn = (inn: string): boolean => {
    if (inn.length === INN_DIGITS_LENGTH.individual) {
        return checkControlSumInn(inn, "FL_N1") && checkControlSumInn(inn, "FL_N2");
    }
    return checkControlSumInn(inn, "UL_N1");
};

export const checkControlSumInn = (inn: string, controlSumType: ControlSumType) => {
    let currentControlSum = 0;

    const controlNumber = getCurrentControlNumber(inn, controlSumType);
    const startPosition = StartPositionType[controlSumType];

    for (let index = 0; index < inn.length && startPosition + index < CONTROL_NUMBERS.length; index += 1) {
        currentControlSum += Number(inn[index]) * CONTROL_NUMBERS[startPosition + index];
    }

    return currentControlSum % 11 === Number(controlNumber);
};

export const validateKpp = (kpp: string): boolean => {
    return /^\d{9}$/.test(kpp) && `${kpp[5]}${kpp[6]}` !== `50` && `${kpp[5]}${kpp[6]}` !== `01` && `${kpp[5]}${kpp[6]}` !== `45`;
};
