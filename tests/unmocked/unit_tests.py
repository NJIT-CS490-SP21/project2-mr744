'''
    split_test.py
    
    This file tests string.split(). In the real world, there's no need to test
    Python's library functions, but we're just doing this as an intro to unit
    tests.
'''

import unittest
import os
import sys
sys.path.append(os.path.abspath('../../'))
from app import clear_on_id, on_user_join

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_LENGTH = "length"
KEY_FIRST_WORD = "first_word"
KEY_SECOND_WORD = "second_word"
KEY_ARR = "the_arr"


class ClearListOnDisconnectCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 1,
                KEY_ARR: ['Mihir','Bob','Alice','Wallace'],
                KEY_EXPECTED: [],
            },
            {
                KEY_INPUT: 2,
                KEY_ARR: ['Mihir','Bob','Alice'],
                KEY_EXPECTED: [],
            },
            {
                KEY_INPUT: 3,
                KEY_ARR: ['Mihir', 'Bob', 'Tome','Alan'],
                KEY_EXPECTED: ['Mihir', 'Bob', 'Tome','Alan'],
            },
        ]
        
        
    def test_split_success(self):
        for test in self.success_test_params:
            # actual_result = test[KEY_INPUT].split()
            actual_result = clear_on_id(test[KEY_INPUT],test[KEY_ARR])
            print(f"Actual: {actual_result}")
            expected_result = test[KEY_EXPECTED]
            print(f"Expected: {expected_result}")
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)

            
class OnJoinCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'Sam',
                KEY_ARR:[],
                KEY_EXPECTED: ['Sam'],

            },
            {
                KEY_INPUT: 'David',
                KEY_ARR:['Sam'],
                KEY_EXPECTED: ['Sam','David'],

            },
            {
                KEY_INPUT: 'Tom',
                KEY_ARR: ['Sam','David'],
                KEY_EXPECTED: ['Sam','David','Tom'],

            },
        ]
        
        
    def test_split_success(self):
        for test in self.success_test_params:

            actual_result = on_user_join(test[KEY_INPUT],test[KEY_ARR])
            print(f"Actual: {actual_result}")
            expected_result = test[KEY_EXPECTED]
            print(f"Expected: {expected_result}")
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)

            

if __name__ == '__main__':
    unittest.main()