"use client"

// This would normally come from a database or API
const getHackathonData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
  }
}

const teams = [
  {
    id: "team1",
    name: "CodeCrafters",\
    description: "Looking for UI/UX designers and ML engineers
