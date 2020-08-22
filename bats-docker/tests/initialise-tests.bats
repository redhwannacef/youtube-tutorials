#!/usr/bin/env bats

load test_helper

INITIALISE_SCRIPT="$BATS_TEST_DIRNAME/../scripts/initialise.sh"

@test "should be executable" {
  exists_and_is_executable "$INITIALISE_SCRIPT"
}

@test "should create config file" {
  run "$INITIALISE_SCRIPT" "$BATS_TEST_SUITE_TMPDIR"

  [ -f "$BATS_TEST_SUITE_TMPDIR/.some-config-file" ]

  run cat "$BATS_TEST_SUITE_TMPDIR/.some-config-file"

  [ "$output" == "some_config" ]
}

@test "should output success message" {
  run "$INITIALISE_SCRIPT" "$BATS_TEST_SUITE_TMPDIR"

  [ "$status" -eq 0 ]
  [ "$output" == "initialisation successful" ]
}