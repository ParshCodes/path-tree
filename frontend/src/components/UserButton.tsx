import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

function UserButton() {
	// TODO: Add more functionalities to this button.
	return (
		<Button
			variant="ghost"
			size="icon"
		>
			<User />
		</Button>
	);
}

export default UserButton;
