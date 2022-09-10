import { expect, test } from "vitest";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startAt = new Date();
  const endsAt = new Date();

  startAt.setDate(startAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 3);

  const appointment = new Appointment({
    customer: "John Doe",
    startAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startAt = new Date();
  const endsAt = new Date();

  startAt.setDate(startAt.getDate() + 2);
  endsAt.setDate(endsAt.getDate() + 1);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with strat date befora now", () => {
  const startAt = new Date();
  const endsAt = new Date();

  startAt.setDate(startAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startAt,
      endsAt,
    });
  }).toThrow();
});
