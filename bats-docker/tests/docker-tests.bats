#!/usr/bin/env bats

setup() {
  docker build -t bats-test:test "$BATS_TEST_DIRNAME/../."
}

@test "git installed" {
  run docker run -it --name bats-test bats-test:test git --version

  [ "$status" -eq 0 ]
}

teardown() {
  docker rm bats-test
  docker rmi bats-test:test
}