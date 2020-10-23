
import { mapState, mapGetters } from "vuex";
export default {
    CHOOSE_MEMBER: {
        data() {
            return {
                VipId: '',
            }
        },
        computed: {
            ...mapGetters({
                selmember: 'selmember',
            })
        },
        methods: {

        },
        components: {
            // selMemberPage: () => import("@/components/selected/selmember2.vue"),
            dropdown: () => import("@/components/selected/dropdown")
        },
    }
}