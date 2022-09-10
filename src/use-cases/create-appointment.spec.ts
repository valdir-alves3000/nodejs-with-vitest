import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();

    const startAt = new Date();
    const endsAt = new Date();

    startAt.setDate(startAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
