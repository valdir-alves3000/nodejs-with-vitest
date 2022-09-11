import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointmen: Appointment): Promise<void> {
    this.items.push(appointmen);
  }

  async findOverlappingAppointment(
    startAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startAt, end: endsAt },
        { start: appointment.startAt, end: appointment.endsAt },
        { inclusive: true }
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}
