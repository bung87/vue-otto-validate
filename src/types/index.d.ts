import { DirectiveBinding, DirectiveOptions } from "vue/types/options";
import { VNode, ComponentOptions } from "vue";

declare interface Options {
    className?: string,
    leftOffset?: number,
    position?: string,
    topOffset?: number
}
declare interface Binding extends DirectiveBinding {
    rawName: string
    data: object
}
declare type DirectiveMethod = (
    el: HTMLElement,
    binding: Binding,
    vnode: VNode,
    oldVnode: VNode
) => void;

declare interface Directive {
    // $validateOptions: Options | undefined;
    bind?: DirectiveMethod;
    inserted?: DirectiveMethod;
    update?: DirectiveMethod;
    componentUpdated?: DirectiveMethod;
    unbind?: DirectiveMethod;
}

// declare module 'vue/types/vue' {

//     interface VueConstructor<V extends Vue> {
//         $validateOptions: object
//     }
//     interface Vue {
//         $validateOptions: object
//     }
// }

declare module 'vue/types/options' {
    interface ComponentOptions<V> {
        $validateOptions?: string
    }
}