export type DispatchAction<Tag extends string, Payload = never> = {
  tag: Tag;
  payload?: Payload;
};

export function action<Tag extends string>(tag: Tag): DispatchAction<Tag> {
  return { tag };
}
