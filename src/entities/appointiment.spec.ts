import { expect, test } from "vitest";
import { getFutureDate } from "../tests/utils/get-future-date";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-13");

  const appointment = new Appointment({
    customer: "John Doe",
    startAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startAt = getFutureDate("2022-08-15");
  const endsAt = getFutureDate("2022-08-11");

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
