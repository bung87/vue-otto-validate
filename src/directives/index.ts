
import { merge } from "lodash";
import { VNode } from "vue";
import { Binding, Directive, Options } from "../types";
/**
 * Directive default Options.
 */
const defaultOptions = {
    leftOffset: 0,
    position: "leftTop",
    topOffset: 0,
};
/**
 * Object implemented Directive interfaces.
 * ```js
 * import Validator,{directive} from "vue-otto-validate"
 * Vue.directive("validate", directive, options);
 * ```
 */
export const directive: Directive = {
    inserted(el: HTMLElement, binding: Binding, vnode: VNode) {
        const bindOptions: Options = {};
        if (binding.rawName.indexOf(".") !== -1) {
            bindOptions.className = binding.rawName.split(".").slice(1).join(" ");
        }
        if (binding.value.leftOffset) {
            bindOptions.leftOffset = binding.value.leftOffset;
        }
        if (binding.arg) {
            bindOptions.position = binding.arg;
        }
        if (binding.value.topOffset) {
            bindOptions.topOffset = binding.value.topOffset;
        }
        let globalOptions;
        if (vnode.context && vnode.context.$options && vnode.context.$options.$validateOptions) {
            globalOptions = vnode.context.$options.$validateOptions;
        }
        const options = merge({}, defaultOptions, globalOptions, bindOptions);
        if (vnode.data && vnode.data.directives) {
            const model = vnode.data.directives.find((x) => x.name === "model");
            if (model && model.expression) {
                const modelBindingKey = model.expression;
                const div = document.createElement("div");
                div.style.position = "fixed";
                const rect = el.getBoundingClientRect();
                div.setAttribute("vue-validate-tip", `vue-validate-tip-${modelBindingKey}`);
                if (options.className) {
                    div.className = options.className;
                }

                div.textContent = "tip";
                document.body.append(div);
                const divRect = div.getBoundingClientRect();
                div.style.left = `${rect.left + options.leftOffset}px`;
                div.style.top = `${rect.top - divRect.height - options.topOffset}px`;
                div.style.display = "none";
            }

        }

    },
    componentUpdated(el: HTMLElement, binding: Binding, vnode: VNode, oldVnode: VNode) {
        if (vnode.data && vnode.data.directives && oldVnode.data && oldVnode.data.directives) {
            const model = vnode.data.directives.find((x) => x.name === "model");
            const oldVnodeModel = oldVnode.data.directives.find((x) => x.name === "model");
            if (model && oldVnodeModel) {
                const modelBindingKey = model.expression;
                const modelBindingValue = model.value;
                const oldVnodeValue = oldVnodeModel.value;

                if (modelBindingValue !== oldVnodeValue) {
                    const ele: HTMLElement | null = document.querySelector(`[vue-validate-tip=vue-validate-tip-${modelBindingKey}]`);
                    if (ele) {
                        ele.style.display = "none";
                    }

                }
            }
        }
    },
    unbind() {
        document.querySelectorAll("[vue-validate-tip]").forEach((x) => x.remove());
    },
};
// tslint:disable-next-line: no-default-export
/**
 * Use it as plugin.
 * ```js
 * import Validator,{showErrors} from "vue-otto-validate"
 * Vue.use(Validator,globalOptions);
 * ```
 */
export default {
    // tslint:disable-next-line: no-shadowed-variable
    install(Vue: any, options?: Options) {
        Vue.mixin({
            created() {
                this.$options.$validateOptions = options;
            },
            beforeDestory() {
                delete this.$options.$validateOptions;
            },
        });
        Vue.directive("validate", directive, options);
    },
};
/**
 *
 * ```js
 * import Validator,{showErrors} from "vue-otto-validate"
 * axios.post(...).catch(r => {showErrors( r.response.data.errors)});
 * ```
 */
export function showErrors(errors: string[][]) {
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            const ele: HTMLElement | null = document.querySelector(`[vue-validate-tip=vue-validate-tip-${key}]`);
            const firstError = errors[key].shift();
            if (ele && firstError) {
                ele.textContent = firstError;
                ele.style.display = "block";
            }

        }

    }
}
