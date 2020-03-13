/* eslint-disable no-undef */
import RangePicker from "./index.js";

describe("RangePicker", () => {
  let rangePicker;

  beforeEach(() => {
    rangePicker = new RangePicker({
      from: new Date(2019, 9, 2),
      to: new Date(2019, 10, 5)
    });

    document.body.append(rangePicker.elem);
  });

  afterEach(() => {
    rangePicker.destroy();
  });

  it("Initially shows only input", () => {
    expect(document.querySelector(".rangepicker__input")).toBeInstanceOf(
      HTMLElement
    );
    expect(document.querySelector(".rangepicker__selector").innerHTML).toEqual(
      ""
    );
  });

  it("Opens on click", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__selector").firstElementChild
        .offsetHeight
    ).not.toEqual(0);
  });

  it("Closes on second click", function() {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__selector").firstElementChild
        .offsetHeight
    ).toEqual(0);
  });

  it("Shows selected dates from-to in input", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector(".rangepicker__input").textContent).toMatch(
      /02.10.2019/
    );
    expect(document.querySelector(".rangepicker__input").textContent).toMatch(
      /05.11.2019/
    );
  });

  it("Selects cell start date from", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-11-27"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(
      document.querySelector(".rangepicker__cell.rangepicker__selected_from")
        .textContent
    ).toMatch(/28/);
  });

  it("Selects cell finish date to", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-11-27"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-10-09"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(
      document.querySelector(".rangepicker__cell.rangepicker__selected_from")
        .textContent
    ).toMatch(/10/);
  });

  it("Shows selected dates from-to in input after selection", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-11-27"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-10-09"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(
      document.querySelector('.rangepicker__input span[data-elem="from"]')
        .textContent
    ).toMatch(/10.10.2019/);
    expect(
      document.querySelector('.rangepicker__input span[data-elem="to"]')
        .textContent
    ).toMatch(/28.11.2019/);
  });

  it("Selects the previous month", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector(".rangepicker__selector-control_left")
      .dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__calendar .rangepicker__month")
        .textContent
    ).toMatch(/сентябрь/);
  });

  it("Selects next month", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector(".rangepicker__selector-control_right")
      .dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__calendar .rangepicker__month")
        .textContent
    ).toMatch(/ноябрь/);
  });

  it("Selects the date in the previous month and checks the dates from to", () => {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document
      .querySelector(".rangepicker__selector-control_left")
      .dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__calendar .rangepicker__month")
        .textContent
    ).toMatch(/сентябрь/);
    document
      .querySelector('.rangepicker__cell[data-value*="2019-09-01"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    document
      .querySelector('.rangepicker__cell[data-value*="2019-10-29"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(
      document.querySelector('.rangepicker__input span[data-elem="from"]')
        .textContent
    ).toMatch(/02.09.2019/);
    expect(
      document.querySelector('.rangepicker__input span[data-elem="to"]')
        .textContent
    ).toMatch(/30.10.2019/);
  });

  it("Closes when clicked outside the range-picker field", function() {
    document
      .querySelector(".rangepicker__input")
      .dispatchEvent(new MouseEvent("click"));
    document.querySelector("body").dispatchEvent(new MouseEvent("click"));
    expect(
      document.querySelector(".rangepicker__selector").firstElementChild
        .offsetHeight
    ).toEqual(0);
  });
});
