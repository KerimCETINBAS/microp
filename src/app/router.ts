import { IMicropStackable, MicropStackItem, MicropStackType } from "../internal/stack";

export class MicropRouter implements IMicropStackable  {
    public stacks: MicropStackType = new Map<RegExp, MicropStackItem>();
}