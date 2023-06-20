import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dots, DropdownContent, DropdownItem } from "./styles";
import { Pencil, Trash } from "phosphor-react";

interface DropdownProps {
	onDelete: () => void;
	onEdit: () => void;
}
export function Dropdown({ onDelete, onEdit }: DropdownProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Dots />
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownContent sideOffset={5}>
					<DropdownItem onClick={onDelete}>
						Deletar <Trash size={20} weight="fill" />
					</DropdownItem>

					<DropdownItem onClick={onEdit}>
						Editar <Pencil size={20} weight="fill" />
					</DropdownItem>
				</DropdownContent>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
