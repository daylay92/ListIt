import mongoose from 'mongoose';

const { Schema } = mongoose;
const options = { timestamps: true };

const bucketListSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    goals: [
      {
        text: {
          type: String,
          required: true,
          minlength: 3
        },
        status: {
          type: String,
          default: 'pending',
          enum: ['pending', 'completed']
        },
        tracking: {
          type: Boolean,
          default: false
        },
        from: {
          type: Date,
          required: function() {
            return this.tracking === true;
          }
        },
        to: {
          type: Date,
          required: function() {
            return this.tracking === true;
          }
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  options
);
bucketListSchema.index({ name: 'text' });
const BucketList = mongoose.model('BucketList', bucketListSchema);

export default BucketList;
