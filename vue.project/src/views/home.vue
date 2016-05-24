<template>
    <div class="home">
        {{ content }}

        <a href="">测试</a>
        <button @click="showToast">showToast</button>
        <button @click="showModal = !showModal">全局弹窗</button>
        <button @click="showGlobalModal">全局弹窗自定义</button>

        <!--modal-->
        <modal :show.sync="showModal" v-ref:index-modal>
            <h3 slot="header">内容</h3>
            <div slot="body"><span v-text="modalbody"></span></div>
            <div slot="footer">底部</div>
        </modal>

        <!--globalmodal-->
        <globalmodal :globalmodal.sync="globalModal"></globalmodal>

        <!--toast-->
        <toast v-ref:toast :toast.sync="toast">
            <div slot="content">{{ toast.content}}</div>
        </toast>

    </div>

</template>
<style>

</style>
<script>
    module.exports = {
        name: 'Home',
        title: '首页',
        data: function(){
            return {
                content: 'home page111111',
                toast: {
                    content: '正在加载...'
                },
                showModal: false,
                globalModal :{ //自定义弹层
                    rd: 0,
                    title: '',
                    content: '',
                    confirmFn: function(){},
                    cancelFn: function(){}
                },
                modalbody: "可以通过在组件中调用 this.$parent.modalbody='' 来修改这里的内容"

            }
        },
        components:{
            toast: require('../components/toast'),
            globalmodal: require('../components/globalmodal'),
            modal: require('../components/modal')
        },
        events:{

        },
        methods: {
            showToast: function(){
//                this.toast.content = 'toast  2.5s...';
                this.toast = { content : '自定义时长3s...', timer : 3000};
            },
            //自定义弹窗事件
            showGlobalModal: function(){
                this.globalModal = {
                    rd: Math.random(),
                    title: 'title',
                    content: this.content,
                    confirmFn: function(){
                        console.log('自定义confirmFn'+Math.random());
                    },
                    cancelFn: function(){
                        console.log('自定义cancelFn'+Math.random());
                    }
                }
            }
        }

    };
</script>