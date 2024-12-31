/* eslint-disable prettier/prettier */
// src/book-test-drive/book-test-drive.service.ts
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTestDrive } from './book-test-drive.model';

@Injectable()
export class BookTestDriveService {
  constructor(
    @InjectModel(BookTestDrive.name, 'cars')
    private readonly bookTestDriveModel: Model<BookTestDrive>,
  ) {}

  // Create a new test drive booking
  async createBooking(data: Partial<BookTestDrive>): Promise<BookTestDrive> {
    // Check for time slot availability
    const existingBooking = await this.bookTestDriveModel
      .findOne({
        carModel: data.carModel,
        preferredDate: data.preferredDate,
        preferredTimeSlot: data.preferredTimeSlot,
      })
      .exec();

    if (existingBooking) {
      throw new BadRequestException(
        'Time slot is unavailable, please choose another slot.',
      );
    }

    const booking = new this.bookTestDriveModel(data);
    return booking.save();
  }

  // Get all bookings
  async getAllBookings(): Promise<BookTestDrive[]> {
    return this.bookTestDriveModel.find().exec();
  }

  // Get a single booking by ID
  async getBookingById(id: string): Promise<BookTestDrive> {
    return this.bookTestDriveModel.findById(id).exec();
  }

  // Update a booking
  async updateBooking(
    id: string,
    updateData: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    // If updating time slot, check availability
    if (updateData.preferredDate && updateData.preferredTimeSlot) {
      const existingBooking = await this.bookTestDriveModel
        .findOne({
          carModel: updateData.carModel,
          preferredDate: updateData.preferredDate,
          preferredTimeSlot: updateData.preferredTimeSlot,
          _id: { $ne: id },
        })
        .exec();

      if (existingBooking) {
        throw new BadRequestException(
          'Time slot is unavailable, please choose another slot.',
        );
      }
    }

    return this.bookTestDriveModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .exec();
  }

  // Delete a booking
  async deleteBooking(id: string): Promise<void> {
    await this.bookTestDriveModel.findByIdAndDelete(id).exec();
  }
}
