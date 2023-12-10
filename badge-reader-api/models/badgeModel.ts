import mongoose, { Schema, Document, Model } from 'mongoose'

/**
 * Interface representing a badge document in MongoDB.
 * @interface
 * @extends Document
 */
export interface IBadge extends Document {
  badgeId: string;
  name: string;
  lastScanned: Date | null;
  isScanned: boolean;
}

/**
 * Mongoose schema for the Badge model.
 * @type {Schema<IBadge>}
 */
const badgeSchema = new Schema<IBadge>({
  badgeId: { type: String, required: true },
  name: { type: String, required: true },
  lastScanned: { type: Date, default: null },
  isScanned: { type: Boolean, default: false }
})

/**
 * Mongoose model for the Badge collection.
 * @type {Model<IBadge>}
 */
const BadgeModel: Model<IBadge> = mongoose.model<IBadge>('Badge', badgeSchema)

export default BadgeModel
