import React, { FC, useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useSendSuggestionMutation } from "../../helpers/APIHelpers";
//https://redux-toolkit.js.org/rtk-query/usage/mutations#standard-mutation-example
export const AudienceFacing: FC = () => {
	const [sendSuggestion, { data, isSuccess, isLoading, isError, error }] =
		useSendSuggestionMutation();
	const [suggestion, setSuggestion] = useState<string>("");
	console.log({ data, isLoading, error });
	useEffect(() => {
		if (isSuccess) setSuggestion("");
	}, [isSuccess]);

	const ErrorMessage = () => {
		let message: any = "";
		if (isError && error) {
			if ("data" in error) {
				message = error.data;
			} else if ("status" in error) {
				message = error.status;
			} else {
				message = error.message;
			}
		}
		if (message.length) {
			return <Typography>Error: {message}</Typography>;
		}
		return null;
	};
	return (
		<Typography variant="h5">
			Want to submit something for the show you're watching? Fill this in
			(Maximum 100 characters, keep it PG-13):
			<br />
			<TextField
				disabled={isLoading}
				label="Suggestion"
				value={suggestion}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setSuggestion(event.target.value);
				}}
				inputProps={{ maxLength: 100 }}
			/>
			<Button
				onClick={() => {
					sendSuggestion(suggestion);
				}}
				disabled={suggestion.length < 1}
				variant="contained"
			>
				Submit Suggestion
			</Button>
			{isSuccess && (
				<Typography>You have successfully submitted a suggestion!</Typography>
			)}
			{ErrorMessage()}
		</Typography>
	);
};
