<template>
  <v-div>
    <Card />
    <Rutina />
    <EmailTF />

    <PassTF />

    <DataTable />
    <Star />
    <!-- <TimePicker /> -->
    <Alert />
    <DefaultB />
    <OutlinedB />
    <RoundB />
    <OutlinedRoundB />
    <IconB />
    <OutlinedIconB />
    <EditPencil />
    <AvatarIcon />
    <AlertClosingRutine />
  </v-div>
</template>

<script>
export default {
  name: "Home",

  components: {
    Card: () => import("../components/Card"),
    DataTable: () => import("../components/DataTable"),
    Star: () => import("../components/Star"),
    // TimePicker: () => import("../components/TimePicker"),
    Alert: () => import("../components/Alert"),
    AvatarIcon: () => import("../components/AvatarIcon"),
    Rutina: () => import("../components/Rutina"),
    EmailTF: () => import("../components/TextFields/EmailTF"),
    PassTF: () => import("../components/TextFields/PassTF"),
    EditPencil: () => import("../components/EditPencil"),
    AlertClosingRutine: () => import("../components/AlertClosingRutine"),

    DefaultB: () => import("../components/Buttons/DefaultB"),
    OutlinedB: () => import("../components/Buttons/OutlinedB"),
    RoundB: () => import("../components/Buttons/RoundB"),
    OutlinedRoundB: () => import("../components/Buttons/OutlinedRoundB"),
    IconB: () => import("../components/Buttons/IconB"),
    OutlinedIconB: () => import("../components/Buttons/OutlinedIconB"),
  
  },
};
</script>
