#! /usr/bin/bash

# NAME="sai"
# if [ NAME == "sai" ]
# then 
# echo NAME
# else
# echo "not sai"
# fi



# NUM1=3
# NUM2=21

# if [ $NUM1 -gt $NUM2 ]
# then 
# echo $NUM1 is greater than $NUM2
# elif [ $NUM1 -lt $NUM2 ]
# then 
# echo $NUM2
# else
# echo EQUAL
# fi

# added another comment
# comment added 
# FILE=test.txt

# # mkdir $FILE

# if [ -e $FILE ]
# then 
# echo $FILE
# else
# echo not a file
# fi



# AGE=34


# if [ $AGE -gt 21 ]
# then 
# AGE=Yes
# else
# AGE=no
# fi


# case $AGE in

# [Yy] |  [Yy][Ee][Ss])
# echo "you can drink"
# ;;

# [Nn] | [Nn][Oo])
# echo "you cant drink"
# ;;

# *)
# echo "default statement"
# ;;
# esac



# NAMES="damaruka sai nath"

# for NAME in $NAMES
# do 
# echo "hii $NAME"
# done

# touch 1.txt 2.txt 3.txt


# FILES=$(ls *.txt)

# for FILE in $FILES
# do 
# cat $FILE  



# done

# NUM=1

# while [ $NUM -le 10 ]
# do
# if ((NUM % 2 ))
# then 
# echo $NUM >> 1.1.txt
# fi
# NUM=`expr $NUM + 1 `

# done

# num=`expr length "sai123"`

# echo $num
# if [ $num -lt 4 ]
# then 
# echo 0
# fi


# file=1.1.txt

# if [ -e $file ]
# then
# echo file exists
# fi

# function fun1(){
#     # a=($*)

#     for i in "$*"
#     do 
#     echo $i 
#     done

    
# }
# fun1 sainath "2ndline cdicmds" aisdmsasnd
 
# echo "Printing \$* "
# for i in $*
# do
#         echo i is: $i
# done

# echo "Printing \$@ "
# for i in "$@"
# do
#         echo i is: $i
# done
# a=0
# while [ "$a" -lt 10 ]    # this is loop1
# do
#    b=$a
#    while [ "$b" -ge 0 ]  # this is loop2
#    do
#       echo -n "$b "
#       b=`expr $b - 1`
#    done
#    echo
#    a=`expr $a + 1`
# done


# echo "print(\"hello\")" > test.py
# file="./new.sh"
# if [ -x $file ]
# then 
# echo "Undhi"
# else
# echo "Ledhu"
# fi
# mkdir newdir


# cat > 1.1.txt

# cat > 1.1.txt

# i=1
# temp=1
# while [ $i -lt  6 ]
# do 
# j=1
# while [ $j -le $i ]
# do 
# echo -n $temp ""
# ((temp++))
# j=`expr $j + 1`
# done
# i=`expr $i + 1`
# echo 
# done



# for (( i=1 ; i <= 5 ; i++ ))
# do
# for (( j=1 ; j <= 5-i ; j++ ))
# do
# echo -n " "
# done
# for (( j =1 ; j <= i ; j++ ))
# do
# echo -n "$j "
# done
# echo 
# done



# for i in {a..b}{0..100..5}{b..c}
# do 
# echo $i
# done



# my_var=""
# if [ -!z "$my_var" ]
# then
#       echo "\$my_var is NULL"
# else
#       echo "\$my_var is NOT NULL"
# fi


# echo "before exit"


#command for deleting unnecessary text files



# for i in {1..3}
# do
# rm $i.$i.txt
# done

