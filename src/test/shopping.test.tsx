import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { DailyFreshHome } from "@/routes/index";

vi.setConfig({ testTimeout: 60000 });

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn();
});
afterEach(cleanup);

describe("Daily Fresh demo shopping", () => {
  it("adds products, updates quantities and calculates the basket total", () => {
    render(<DailyFreshHome />);
    fireEvent.click(screen.getByRole("button", { name: "Add Fresh Tomato to cart" }));
    fireEvent.click(screen.getByRole("button", { name: "Add one Fresh Tomato" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Open cart, 2 items" })[0]!);
    const basket = screen.getByRole("dialog");
    expect(within(basket).getAllByText("₹64")).toHaveLength(2);
    fireEvent.click(within(basket).getByRole("button", { name: "Remove one Fresh Tomato" }));
    expect(within(basket).getAllByText("₹32")).toHaveLength(2);
    fireEvent.click(within(basket).getByRole("button", { name: "Remove one Fresh Tomato" }));
    expect(within(basket).getByText("Your basket is taking a breather.")).toBeInTheDocument();
  });

  it("filters offers and handles unmatched searches", () => {
    render(<DailyFreshHome />);
    fireEvent.click(
      within(screen.getByRole("group", { name: "Filter products" })).getByRole("button", {
        name: "Offers",
      }),
    );
    expect(screen.getByRole("heading", { name: "Fresh Tomato" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Red Onion" })).not.toBeInTheDocument();
    fireEvent.change(screen.getAllByRole("textbox", { name: "Search products" })[0]!, {
      target: { value: "nothing matches" },
    });
    expect(screen.getByText("No fresh picks found")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show all products" }));
    expect(screen.getByRole("heading", { name: "Red Onion" })).toBeInTheDocument();
  });

  it("uses the selected chicken pack and cut in basket pricing", () => {
    render(<DailyFreshHome />);
    const card = screen.getByRole("heading", { name: "Chicken Breast" }).closest("article")!;
    fireEvent.click(within(card).getByRole("button", { name: "Customize pack & cut" }));
    fireEvent.change(screen.getByLabelText("Pack size"), { target: { value: "1 kg" } });
    fireEvent.change(screen.getByLabelText("Preparation"), { target: { value: "Small pieces" } });
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Chicken Breast to cart" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Open cart, 1 items" })[0]!);
    expect(within(screen.getByRole("dialog")).getByText(/1 kg.*Small pieces/)).toBeInTheDocument();
    expect(within(screen.getByRole("dialog")).getAllByText("₹378")).toHaveLength(2);
  });
});
