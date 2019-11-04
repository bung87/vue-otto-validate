/**
 * @jest-environment jsdom
 */

// tslint:disable: no-implicit-dependencies
import SignUp from "@/components/sign_up.vue";
import { showErrors } from "@/directives/index";
import * as utils from "@vue/test-utils";
// import { renderToString } from '@vue/server-test-utils'
describe(`testing directive`, () => {

    const wrapper = utils.shallowMount(SignUp);

    it("attach a element with attribute vue-validate-tip", () => {

        expect(wrapper.findAll("[vue-validate-tip]")).toHaveLength(3);
    });

    it("use modifers as tip element className", () => {
        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-email]").classes()).toEqual(["className1"]);
        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-password]").classes()).toEqual(["className1", "className2"]);
    });

    it("use arg as tip element position", () => {
        expect(wrapper.find("[vue-validate-tip]").attributes("vue-validate-tip-position")).toEqual("test");
    });
    // it('use modifers as tip element className', async () => {
    //     const str = await serverUtils.renderToString(SignUp, {

    //     })
    //     expect(str).toContain('vue-validate-tip')
    // })
});

describe(`testing showErrors`, () => {
    const wrapper = utils.shallowMount(SignUp, {
        attachToDocument: true,
        mounted() {
            showErrors({
                email: ["Email already been taken"],
            });
        },
    });

    it("accept a object key with field name value with Record<string, string[]> as argument", () => {
        showErrors({
            email: ["Email already been taken"],
        });
    });

    it("show tip element", () => {
        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-email]").isVisible()).toBe(true);
    });

    it("tip element contains error message", () => {
        expect(wrapper.find("[vue-validate-tip=vue-validate-tip-email]").text()).toEqual("Email already been taken");
    });

    it("remove tip elements properly when destroy", () => {
        const wrapper2 = utils.shallowMount(SignUp, {
            attachToDocument: true,
            mounted() {
                showErrors({
                    email: ["Email already been taken"],
                });
            },
        });
        const vnode = wrapper2.vm.$vnode;
        expect(vnode.componentInstance).toHaveProperty("$options.$validateOptions", { className: "text-danger" });
        wrapper2.destroy();
        expect(vnode.componentInstance).toHaveProperty("$options.$validateOptions", undefined);
        expect(wrapper2.findAll("[vue-validate-tip]")).toHaveLength(0);
    });

});
