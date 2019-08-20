project(wait-for-process)

add_executable(wait-for-process
    main.cc
)

target_link_libraries(wait-for-process
    psapi.lib
)