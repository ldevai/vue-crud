import moment from 'moment';

export default {
    parseRawCreatedUpdatedDate(item) {
        item.created_at = moment(item.created_at).format('YYYY-MM-DD')
        item.updated_at = moment(item.updated_at).format('YYYY-MM-DD')
    },

    parseRawCreatedUpdatedDateArray(items) {
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                this.parseRawCreatedUpdatedDate(items[i]);
            }
        }
    },

    parseRawCreatedUpdatedTimestamp(item) {
        item.created_at = moment(item.created_at).format('YYYY-MM-DD hh:mm')
        item.updated_at = moment(item.updated_at).format('YYYY-MM-DD hh:mm')
    },

    parseRawCreatedUpdatedTimestampArray(items) {
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                this.parseRawCreatedUpdatedTimestamp(items[i]);
            }
        }
    }
}