import { Meta, Story } from "@storybook/addon-docs"
import React from "react"
import PokemonDetails from "./PokemonDetails"

export default {
  component: PokemonDetails,
  title: "PokemonDetails"
}

const Template = args => <PokemonDetails {...args} />

export const Default = Template.bind({})
Default.args = {
  id: "1",
  name: "Test PokemonDetails",
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  types: ["Grass", "Poison"],
  state: "SOMETHING"
}
