import { Meta, Story } from "@storybook/addon-docs"
import React from "react"
import Pokemon from "./Pokemon"

export default {
  component: Pokemon,
  title: "Pokemon"
}

const Template = args => <Pokemon {...args} />

export const Default = Template.bind({})
Default.args = {
  id: "1",
  name: "Test Pokemon",
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  types: ["Grass", "Poison"],
  state: "SOMETHING"
}

export const FirePokemon = Template.bind({})
FirePokemon.args = {
  id: "2",
  name: "Charmander",
  image: "https://img.pokemondb.net/artwork/charmander.jpg",
  types: ["Fire"],
  state: "FirePokemon"
}

export const OtherState = Template.bind({})
OtherState.args = {
  ...Default.args,
  state: "OTHER_STATE"
}
