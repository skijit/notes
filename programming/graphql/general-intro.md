GraphQL and Whatnot
================

## Schema Definition Language (SDL)
- Parameters can be applied to queries OR types
- Parameters are usually given their own type, defined with `input` instead of type
- Output from queries are usually a pure type, whereas output from Mutations are usually a Response tyle of some kind.
- For response types, the best practice is to return data you're updating so the client cache updates automatically
- [sdl cheatsheet](https://devhints.io/graphql#schema)
- Union, enum, and interface types are supported

```
type Query {  
  launches: [Launch]!
}

type Mutation {
  bookTrips(launchIds: [ID]!): TripUpdateResponse!
}

# ...

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}

enum PatchSize {
  SMALL
  LARGE
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}  
```

## CLient Side Notes
- Queries are usually stored in constants, called with a `gql` template function
- One difference from classic REST: there are separate client-side query or mutations defined.
  - they can't correspond 1:1 with the SDL's Query and Mutations because these are batched from the client anyways.
- Client-side queries can define fragments (reusable bits of projections) which are defined corresponding to the server-side query operation name.

```(javascript)
export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;
```

- With some graphql clients, you can control the queries fetch policy:
  - whether it should prefer cache over network
  - default is `cache-first`
  - other option is `network-only` - maybe there are others too


