setup() {
  export BATS_TEST_SUITE_TMPDIR="$BATS_TMPDIR/bats-test-tmp"
  mkdir -p "$BATS_TEST_SUITE_TMPDIR"
}

teardown() {
  rm -rf "$BATS_TEST_SUITE_TMPDIR"
}

exists_and_is_executable() {
  [ -x "$1" ]
}