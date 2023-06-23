interface IOption {
    value: string;
    label: string;
}

const initialOptions: IOption[] = [
    { value: 'Option 1', label: 'Option 1'},
    { value: 'Option 2', label: 'Option 2'},
    { value: 'Option 3', label: 'Option 3'},
    { value: 'Option 4', label: 'Option 4'},
    { value: 'Option 5', label: 'Option 5'},
    { value: 'Option 6', label: 'Option 6'},
];

export const modifyOptions = (str?: string): IOption[] => {
    if (!str) {
        return initialOptions;
    }

    const modifiedOptions: IOption[] = initialOptions.map((option, index) => {
        return {
            ...option,
            value: `Option ${str}-${index + 1}`,
            label: `Option ${str}-${index + 1}`,
        };
    });

    return modifiedOptions;
}