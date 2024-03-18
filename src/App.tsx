import { useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
	const messageRef = useRef<HTMLInputElement>(null);
	const socket = io("https://socket-server-fuve.onrender.com", {
		withCredentials: true,
		extraHeaders: {
			"my-custom-header": "abcd",
		},
	});

	const sendMesage = (e: React.FormEvent) => {
		e.preventDefault();
		const message = messageRef.current?.value;
		if (message) {
			socket.emit("message", message);
		} else {
			console.log("No message");
		}
	};

	useEffect(() => {
		socket.on("received_message", (msg: string) => {
			alert(msg);
		});
	}, [socket]);

	return (
		<>
			<h1>Socket Client</h1>
			<form onSubmit={sendMesage}>
				<input type="text" name="message" ref={messageRef} />
				<button type="submit">Send</button>
			</form>
		</>
	);
}

export default App;
