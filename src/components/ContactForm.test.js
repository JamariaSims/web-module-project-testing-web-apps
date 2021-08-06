import React from "react";
import * as libInputs from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

describe("App", () => {
	test("renders without errors", () => {
		libInputs.render(<ContactForm />);
	});

	test("renders the contact form header", () => {
		const wrapper = libInputs.render(<ContactForm />);
		const header = wrapper.getByText(/Contact Form/i);
		expect(header).toBeInTheDocument();
		expect(header).toBeTruthy();
		expect(header).toHaveTextContent(/Contact Form/i);
	});

	test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const firstname = wrapper.getByPlaceholderText(/Edd/i);
		userEvent.type(firstname, "test");
		await (() => {
			const error = wrapper.queryByText(
				/firstName must have at least 5 characters./i
			);
			expect(error).toBeInTheDocument();
		});
	});

	test("renders THREE error messages if user enters no values into any fields.", async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const button = wrapper.getByRole("button");
		userEvent.click(button);
		const errors = wrapper.getAllByTestId("error");
		expect(errors).toHaveLength(3);
	});

	test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const firstname = wrapper.getByPlaceholderText(/Edd/i);
		const lastname = wrapper.getByPlaceholderText(/Burke/i);
		const checkList = [firstname, lastname];
		checkList.map((currentTarget) => {
			userEvent.type(currentTarget, "testman");
		});
		const button = wrapper.getByRole("button");
		userEvent.click(button);
		const error = wrapper.queryByText(/email must be a valid email address./i);
		expect(error).toBeInTheDocument();
	});

	test('renders "email must be a valid email address" if an invalid email is entered', async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const email = wrapper.getByPlaceholderText(/bluebill1049@hotmail.com/i);
		userEvent.type(email, "testman.com");
		const error = wrapper.queryByText(/email must be a valid email address./i);
		expect(error).toBeInTheDocument();
	});

	test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const firstname = wrapper.getByPlaceholderText(/Edd/i);
		const email = wrapper.getByPlaceholderText(/bluebill1049@hotmail.com/i);
		const button = wrapper.getByRole("button");
		userEvent.type(firstname, "Jamaria");
		userEvent.type(email, "JamariaxSims@gmail.com");
		userEvent.click(button);
		const error = wrapper.queryByText(/lastName is a required field./i);
		expect(error).toBeInTheDocument();
	});

	test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
		//Arrange
		const wrapper = libInputs.render(<ContactForm />);
		const firstname = wrapper.getByPlaceholderText(/Edd/i);
		const lastname = wrapper.getByPlaceholderText(/Burke/i);
		const email = wrapper.getByPlaceholderText(/bluebill1049@hotmail.com/i);
		const button = wrapper.getByRole("button");
		//Act
		userEvent.type(firstname, "Jamaria");
		userEvent.type(lastname, "Sims");
		userEvent.type(email, "JamariaxSims@gmail.com");
		userEvent.click(button);
		//Assert
		await (() => {
			const DisplayComponent = libInputs.render(<DisplayComponent />);

			!DisplayComponent.findAllByTestId("messageDisplay")
				? expect(DisplayComponent.findAllByTestId(item)).toBeInTheDocument()
				: () => {
						const list = [
							"firstnameDisplay",
							"firstnameDisplay",
							"emailDisplay",
						];
						list.map((item) => {
							expect(
								DisplayComponent.findAllByTestId(item)
							).toBeInTheDocument();
						});
				  };
		});
	});

	test("renders all fields text when all fields are submitted.", async () => {
		const wrapper = libInputs.render(<ContactForm />);
		const firstname = wrapper.getByPlaceholderText(/Edd/i);
		const lastname = wrapper.getByPlaceholderText(/Burke/i);
		const email = wrapper.getByPlaceholderText(/bluebill1049@hotmail.com/i);
		const message = wrapper.getByRole("textbox");
		const targetList = [firstName, lastName, email, message];
		targetList.map((target) => {
			target === email
				? userEvent.type(email, "JamariaxSims@gmail.com")
				: userEvent.type(target, "Jamaria");
			expect(target).toBeInTheDocument();
		});
	});
});
