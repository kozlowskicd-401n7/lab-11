'use strict';

class Storage {
    constructor(schema) {
        this.schema = schema;
    }

    find(query) {
        let _id = query && query._id;
        let queryObj = _id ? {_id} : {};
        return this.schema.find(queryObj);
    }

    save(data) {
        if (data._id) {
            return this.schema.findByIdAndUpdate(data._id, data);
        }
        else {
            let record = new this.schema(data);
            return record.save();
        }
    }

    delete(id) {
        return this.schema.findByIdAndDelete(id);
    }
}

export default Storage