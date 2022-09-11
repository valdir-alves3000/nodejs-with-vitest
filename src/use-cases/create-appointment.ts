import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmensRepository: AppointmentRepository) {}

  async execute({
    customer,
    startAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmensRepository.findOverlappingAppointment(
        startAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startAt,
      endsAt,
    });

    await this.appointmensRepository.create(appointment);

    return appointment;
  }
}
