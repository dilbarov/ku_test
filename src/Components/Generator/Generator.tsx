import * as React from "react";
import { Button, Select, Input, ThemeContext, FLAT_THEME } from '@skbkontur/react-ui';
import { generateInn, generateKpp } from '../../../utils/generator.utils';
import cn from './Generator.less';

enum innType {
    ul = 'Юридическое лицо',
    fl = 'Физическое лицо'
};

export const Generator: React.FC = () => {
    const [currentInnType, setInnType] = React.useState<string>(innType.ul);
    const [inn, setInn] = React.useState<string>('');
    const [kpp, setKpp] = React.useState<string>('');

    const handleClick = (): void => {
        setInn(currentInnType === innType.ul ? generateInn('ul') : generateInn('fl'));
        setKpp(currentInnType === innType.ul ? generateKpp() : '');
    };

    return (
        <ThemeContext.Provider value={FLAT_THEME}>
            <div className={cn('container')}>
                <div className={cn('row', 'select')}>
                    <Select
                        items={[innType.ul, innType.fl]}
                        value={currentInnType}
                        onValueChange={(val: any) => setInnType(val)}
                        width='200px'
                    />
                </div>

                <div className={cn('row', 'input')}>
                    <span className={cn('input-title')}>ИНН</span>
                    <Input value={inn} selectAllOnFocus={true}/>
                </div>

                <div className={cn('row', 'input')}>
                    <span className={cn('input-title')}>КПП</span>
                    <Input value={kpp} selectAllOnFocus={true}/>
                </div>

                <div className={cn('row', 'btn')}>
                    <Button use='primary' width='160px' onClick={handleClick}>Сгенерировать</Button>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};
