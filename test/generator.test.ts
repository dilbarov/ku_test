import { expect } from "chai";
import { checkExpressionForNumber, validateInn, validateKpp } from "../tools/common.tools";
import { generateInn, generateKpp } from "../utils/generator.utils";

describe("Generator", () => {
    describe("Проверка ИНН", () => {
        const innUl = generateInn(`ul`);
        const innFl = generateInn(`fl`);
        it("ИНН юридического лица содержит 10 символов ", () => {
            expect(innUl.length).to.eql(10);
        });
        it("ИНН физического лица/ИП содержит 12 символов ", () => {
            expect(innFl.length).to.eql(12);
        });
        it("ИНН не начинается с 00", () => {
            expect(checkExpressionForNumber(innUl)).to.eql(true);
            expect(checkExpressionForNumber(innFl)).to.eql(true);
        });
        it("Инн соответствует контрольной сумме", () => {
            expect(validateInn(innUl)).to.eql(true);
            expect(validateInn(innFl)).to.eql(true);
        });
    });
    describe("Проверка КПП", () => {
        const kpp = generateKpp();
        it("КПП содержит 9 символов", () => {
            expect(kpp.length).to.eql(9);
        });
        it("КПП не содержит комбинации 01, 45 и 50 в 5 и 6 разряде соответственно", () => {
            expect(validateKpp(kpp)).to.eql(true);
        });
    });
});
