// import SignUp from "@/components/sign_up.vue";
const Validator = require("@/directives/index.ts");
// import Validator,{showErrors} from "@/directives/index.ts"
const SignUp = require("@/components/sign_up.vue")
// import { shallowMount } from "@vue/test-utils";
const utils = require("@vue/test-utils")
// const serverUtils = require("@vue/server-test-utils")
// import { renderToString } from '@vue/server-test-utils'
describe(`testing directive`, () => {

    const wrapper = utils.shallowMount(SignUp, {
        attachToDocument: true
    });

    it("attach a element with attribute vue-validate-tip", () => {

        expect(wrapper.findAll("[vue-validate-tip]")).toHaveLength(3);
    });

    it('use modifers as tip element className', () => {

        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-email]")).className === "className1"
        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-password]")).className === "className1 className2"
    });
    // it('use modifers as tip element className', async () => {
    //     const str = await serverUtils.renderToString(SignUp, {

    //     })
    //     expect(str).toContain('vue-validate-tip')
    // })
});

describe(`testing showErrors`, () => {

    it("accept a object key with field name value with []string as argument", () => {
        Validator.showErrors({
            "email": ["Email already been taken"]
        })
    });

    // it("accept a object key with field name value with []string as argument", () => {
    //     const wrapper = utils.mount(SignUp, {
    //         attachToDocument: true
    //     });
    //     expect(wrapper.find("[vue-validate-tip=vue-validate-tip-email]"))
    // });


});