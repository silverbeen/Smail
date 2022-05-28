export function OptionStateChange(id: 1 | 2 | 3) {
  switch (id) {
    case 1:
      return "content";
    case 2:
      return "desk";
    case 3:
      return "template";
  }
}

export function OptionStateIcon(id: number, saved: boolean) {
  if (id === 1 && saved) return "saved";
  else if (id === 1 && !saved) return "add";
  else return "delete";
}
