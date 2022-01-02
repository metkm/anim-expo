export const CharacterQuery = `query Character($id: Int) {
  Character(id: $id) {
    name {
      userPreferred
      alternative
    }
    image {
      large
    }
    description(asHtml: true)
  }
}`;

export default CharacterQuery;
