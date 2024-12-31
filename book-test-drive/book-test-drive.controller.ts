/* eslint-disable prettier/prettier */
// src/book-test-drive/book-test-drive.controller.ts
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BookTestDriveService } from './book-test-drive.service';
import { BookTestDrive } from './book-test-drive.model';

@Controller('book-test-drive')
export class BookTestDriveController {
  constructor(private readonly bookTestDriveService: BookTestDriveService) {}

  // Create a new booking
  @Post()
  async createBooking(
    @Body() data: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    return this.bookTestDriveService.createBooking(data);
  }

  // Get all bookings
  @Get()
  async getAllBookings(): Promise<BookTestDrive[]> {
    return this.bookTestDriveService.getAllBookings();
  }

  // Get a single booking by ID
  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<BookTestDrive> {
    return this.bookTestDriveService.getBookingById(id);
  }

  // Update a booking
  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    return this.bookTestDriveService.updateBooking(id, updateData);
  }

  // Delete a booking
  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookTestDriveService.deleteBooking(id);
  }
}
