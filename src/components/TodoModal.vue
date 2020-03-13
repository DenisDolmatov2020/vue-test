<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription" class="customModal">
                <div class="customModalTitle">
                    <button class="close" @click.prevent="close">&times;</button>
                    Are you sure?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="close" aria-label="Close modal">
                        Cancel action
                    </button>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "TodoModal",
        methods: {
            close() {
                this.$emit('close');
            },
        },
    }
</script>

<style scoped>
    .customModal {
        box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
        left: calc(50vw - 300px);
        position: absolute;
        z-index: 999;
        width: 600px;
        top: 20vh;
        border-radius: 5px;
        overflow: hidden;
    }
    .customModal .customModalTitle {
        background-color: #ccc;
        text-align: left;
        padding: 8px 12px;
        font-size: 1.5em;
    }
    .customModal .customModalTitle .close {
        line-height: 32px;
        color: #5c4084;
    }
    .customModal .customModalBody {
        background-color: #fff;
        padding: 8px 12px;
        text-align: left;
        padding: 12px;
    }
    .customModal .customModalFooter {
        background-color: #eee;
        padding: 4px 12px;
        text-align: left;
    }

</style>