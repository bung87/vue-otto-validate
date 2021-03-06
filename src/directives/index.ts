
import { merge, throttle } from "lodash";
import { VNode } from "vue";
import { Binding, Directive, Options } from "../types";

/**
 * Directive default Options.
 */
const defaultOptions: Options = {
    leftOffset: 0,
    position: "leftTop",
    responsive: false,
    topOffset: 0,
    translate: "3d",
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
        const value = merge({}, binding.value);
        if (value.leftOffset) {
            bindOptions.leftOffset = value.leftOffset;
        }
        if (binding.arg) {
            bindOptions.position = binding.arg;
        }
        if (value.topOffset) {
            bindOptions.topOffset = value.topOffset;
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
                div.setAttribute("vue-validate-tip-position", `${options.position}`);
                if (options.className) {
                    div.className = options.className;
                }

                div.textContent = "tip";
                document.body.appendChild(div);
                const divRect = div.getBoundingClientRect();
                const left = rect.left + options.leftOffset;
                const top = rect.top - divRect.height - options.topOffset;
                div.style.left = `${left}px`;
                div.style.top = `${top}px`;
                div.style.display = "none";
                if (options.responsive) {
                    window.addEventListener("resize", throttle(() => {
                        const rect1 = el.getBoundingClientRect();
                        // div.style.left = `${rect1.left + options.leftOffset}px`;
                        // div.style.top = `${rect1.top - divRect1.height - options.topOffset}px`;
                        const translate = options.translate === "3d" ? "translate3d" : "translate";
                        const suffix = options.translate === "3d" ? ", 0" : "";
                        div.style.transform = `${translate}(${Math.floor(rect1.left + options.leftOffset - left)}px, ${Math.floor(rect1.top - div.getBoundingClientRect().height - options.topOffset - top)}px${suffix})`;
                    }, 100));
                }
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
    unbind(el: HTMLElement, binding: Binding, vnode: VNode, oldVnode: VNode) {
        if (vnode.context && vnode.context.$options && vnode.context.$options.$validateOptions) {
            vnode.context.$options.$validateOptions = undefined;
        }
        if (vnode.data && vnode.data.directives) {
            const model = vnode.data.directives.find((x) => x.name === "model");
            if (model && model.expression) {
                const modelBindingKey = model.expression;
                let ele: HTMLElement | null;
                ele = document.querySelector(`[vue-validate-tip=vue-validate-tip-${modelBindingKey}]`);
                if (ele) {
                    ele.remove();
                }
            }
        }
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
                this.$options.$validateOptions = undefined;
            },
        });

        Vue.directive("validate", directive, options);
    },
};
/**
 * Usage
 * ```js
 * import Validator,{showErrors} from "vue-otto-validate"
 * axios.post(...).catch(r => {showErrors( r.response.data.errors)});
 * ```
 */
export function showErrors(errors: Record<string, string[]>) {
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
