export default await (async () => {
const __VLS_setup = async () => {
const __VLS_Component = (await import('vue')).defineComponent({
setup () {
return {};
},
});
const __VLS_template = () => ({});
return {} as typeof __VLS_Component & (new () => { $slots: ReturnType<typeof __VLS_template>; });
};
return await __VLS_setup();
})();
