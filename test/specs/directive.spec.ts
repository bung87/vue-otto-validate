
import SignUp from "@/components/sign_up.vue";
import { showErrors } from "@/directives/index";
import * as utils from "@vue/test-utils";
const prefix = "vue-validate-tip";
describe(`testing directive`, () => {
    let wrapper;
    beforeEach(() => {
        wrapper = utils.shallowMount(SignUp);
    });
    it(`attach a element with attribute ${prefix}`, () => {

        expect(document.querySelectorAll(`[${prefix}]`)).toHaveLength(3);
    });

    it("use modifers as tip element className", () => {
        expect(document.querySelector(`[${prefix}=${prefix}-email]`).className.split(" ")).toEqual(["className1"]);
        expect(document.querySelector(`[${prefix}=${prefix}-password]`).className.split(" ")).toEqual(["className1", "className2"]);
    });

    it("use arg as tip element position", () => {
        expect(document.querySelector(`[${prefix}]`).getAttribute(`${prefix}-position`)).toEqual("test");
    });
    afterEach(() => {
        wrapper.destroy();
    });
});

describe(`testing showErrors`, () => {
    let wrapper;
    beforeEach(() => {
        wrapper = utils.shallowMount(SignUp, {
            attachToDocument: true,
            mounted() {
                showErrors({
                    email: ["Email already been taken"],
                });
            },
        });
    });

    it("accept a object key with field name value with Record<string, string[]> as argument", () => {
        showErrors({
            email: ["Email already been taken"],
        });
    });

    it("show tip element", () => {
        expect(document.querySelector(`[${prefix}=${prefix}-email]`).getAttribute("style")).toContain("block");
    });

    it("tip element contains error message", () => {
        expect(document.body.querySelector(`[${prefix}=${prefix}-email]`).textContent).toEqual("Email already been taken");
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
        expect(wrapper2.findAll(`[${prefix}]`)).toHaveLength(0);
    });

    afterEach(() => {
        wrapper.destroy();
    });

});
