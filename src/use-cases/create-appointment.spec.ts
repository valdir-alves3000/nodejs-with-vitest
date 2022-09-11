import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmensRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmensRepository);

    const startAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-13");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmensRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmensRepository);

    const startAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "John Doe",
      startAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate("2022-08-12"),
        endsAt: getFutureDate("2022-08-17"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate("2022-08-07"),
        endsAt: getFutureDate("2022-08-13"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-14"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
